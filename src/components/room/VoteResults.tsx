import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface VoteResultsProps {
  roomId: string;
  questionId: string;
  questionType: 'multiple_choice' | 'number_scale' | 'word_cloud' | 'free_text';
}

const VoteResults = ({ roomId, questionId, questionType }: VoteResultsProps) => {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [options, setOptions] = useState<string[]>([]);
  const [wordCounts, setWordCounts] = useState<Record<string, number>>({});
  const [textResponses, setTextResponses] = useState<string[]>([]);

  useEffect(() => {
    // Clear previous results immediately when question changes
    setVotes({});
    setOptions([]);
    setWordCounts({});
    setTextResponses([]);

    loadQuestion();
    loadVotes();
    loadQuestion();
    loadVotes();
    const unsubscribe = subscribeToVotes();

    return () => {
      unsubscribe();
    };
  }, [roomId, questionId]);

  const loadQuestion = async () => {
    const { data } = await supabase
      .from("questions")
      .select("options")
      .eq("id", questionId)
      .single();

    if (data) {
      setOptions((data.options as string[]) || []);
    }
  };

  const loadVotes = async () => {
    const { data } = await supabase
      .from("votes")
      .select("selected_option")
      .eq("room_id", roomId)
      .eq("question_id", questionId);

    if (data) {
      if (questionType === 'word_cloud') {
        const wordFrequency: Record<string, number> = {};
        data.forEach((vote) => {
          const words = vote.selected_option.split(",");
          words.forEach((word) => {
            const trimmed = word.trim().toLowerCase();
            if (trimmed) {
              wordFrequency[trimmed] = (wordFrequency[trimmed] || 0) + 1;
            }
          });
        });
        setWordCounts(wordFrequency);
        setWordCounts(wordFrequency);
      } else if (questionType === 'free_text') {
        setTextResponses(data.map(vote => vote.selected_option));
      } else {
        const voteCounts: Record<string, number> = {};
        data.forEach((vote) => {
          voteCounts[vote.selected_option] = (voteCounts[vote.selected_option] || 0) + 1;
        });
        setVotes(voteCounts);
      }
    }
  };

  const subscribeToVotes = () => {
    const channel = supabase
      .channel("vote-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "votes",
          filter: `question_id=eq.${questionId}`
        },
        () => {
          loadVotes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  if (questionType === 'word_cloud') {
    const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);
    const maxCount = Math.max(...Object.values(wordCounts), 1);

    return (
      <div className="space-y-4">
        {sortedWords.length > 0 ? (
          <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px]">
            {sortedWords.map(([word, count]) => {
              const size = 12 + (count / maxCount) * 32;
              const opacity = 0.5 + (count / maxCount) * 0.5;

              return (
                <span
                  key={word}
                  className="font-bold transition-all"
                  style={{
                    fontSize: `${size}px`,
                    opacity: opacity,
                    color: `hsl(var(--chart-${(word.length % 5) + 1}))`
                  }}
                  title={`${count} ${count === 1 ? 'mention' : 'mentions'}`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-4">No words submitted yet</p>
        )}
      </div>
    );
  }

  if (questionType === 'number_scale') {
    const scaleData = Array.from({ length: 11 }, (_, i) => ({
      value: i,
      count: votes[i.toString()] || 0
    }));

    return (
      <div className="space-y-4">
        {totalVotes > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scaleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="value"
                label={{ value: 'Rating', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                label={{ value: 'Votes', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                        <p className="font-semibold">Rating: {payload[0].payload.value}</p>
                        <p className="text-sm">Votes: {payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="count"
                fill="hsl(var(--primary))"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-muted-foreground py-4">No votes yet</p>
        )}
      </div>
    );
  }

  if (questionType === 'free_text') {
    return (
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {textResponses.length > 0 ? (
          textResponses.map((response, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-muted/30 border border-border/50 text-sm italic shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              "{response}"
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">No responses yet</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {options.map((option) => {
        const count = votes[option] || 0;
        const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;

        return (
          <div key={option} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{option}</span>
              <span className="text-muted-foreground">
                {count} {count === 1 ? "vote" : "votes"} ({percentage.toFixed(1)}%)
              </span>
            </div>
            <div className="h-8 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-chart-1 to-chart-2 transition-all duration-500 flex items-center justify-end px-3"
                style={{ width: `${percentage}%` }}
              >
                {percentage > 10 && (
                  <span className="text-white font-semibold text-sm">
                    {percentage.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {totalVotes === 0 && (
        <p className="text-center text-muted-foreground py-4">No votes yet</p>
      )}
    </div>
  );
};

export default VoteResults;
