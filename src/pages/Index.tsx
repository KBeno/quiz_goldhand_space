import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const [createPassword, setCreatePassword] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const generateRoomCode = () => {
    return Math.floor(Math.random() * 999999 + 1).toString();
  };

  const createRoom = async () => {
    if (createPassword !== "datapao") {
      toast.error("Incorrect password");
      return;
    }

    setIsCreating(true);
    try {
      const code = generateRoomCode();
      const adminPassword = Math.random().toString(36).substring(2, 10);
      
      const { data, error } = await supabase
        .from("rooms")
        .insert([{ code, admin_password: adminPassword }])
        .select()
        .single();

      if (error) throw error;

      toast.success("Room created!", {
        description: `Room code: ${code}\nAdmin password: ${adminPassword}`,
        duration: 10000,
      });

      navigate(`/${code}?admin=${adminPassword}`);
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room");
    } finally {
      setIsCreating(false);
    }
  };

  const joinRoom = async () => {
    if (!roomCode.trim()) {
      toast.error("Please enter a room code");
      return;
    }

    setIsJoining(true);
    try {
      const { data, error } = await supabase
        .from("rooms")
        .select("code")
        .eq("code", roomCode.toUpperCase())
        .single();

      if (error || !data) {
        toast.error("Room not found");
        return;
      }

      navigate(`/${roomCode.toUpperCase()}`);
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error("Failed to join room");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Live Quiz Room
          </h1>
          <p className="text-xl text-muted-foreground">
            Create a room or join with a code to see live results
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>Create New Room</CardTitle>
              <CardDescription>
                Start a new quiz room and get an admin password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password to create room"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && createRoom()}
              />
              <Button 
                onClick={createRoom} 
                disabled={isCreating}
                className="w-full"
                size="lg"
              >
                {isCreating ? "Creating..." : "Create Room"}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle>Join Existing Room</CardTitle>
              <CardDescription>
                Enter a room code to join as a participant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && joinRoom()}
                className="uppercase"
              />
              <Button 
                onClick={joinRoom} 
                disabled={isJoining}
                className="w-full"
                size="lg"
                variant="secondary"
              >
                {isJoining ? "Joining..." : "Join Room"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
