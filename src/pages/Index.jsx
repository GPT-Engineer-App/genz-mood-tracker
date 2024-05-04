import React, { useState } from "react";
import { Container, VStack, Text, Button, Input, Select, Textarea, IconButton, useToast, Box, Heading, List, ListItem, ListIcon, CloseButton } from "@chakra-ui/react";
import { FaPlus, FaRegSmileBeam, FaRegSadCry, FaRegMeh, FaRegAngry, FaTrash } from "react-icons/fa";

const Index = () => {
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 16));
  const toast = useToast();

  const handleAddMood = () => {
    if (!mood || !description) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newMood = {
      id: Date.now(),
      mood,
      description,
      date,
    };

    setMoods([...moods, newMood]);
    setMood("");
    setDescription("");
    setDate(new Date().toISOString().slice(0, 16));
    toast({
      title: "Mood Added",
      description: "Your mood has been recorded!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteMood = (id) => {
    setMoods(moods.filter((mood) => mood.id !== id));
    toast({
      title: "Mood Deleted",
      description: "Your mood has been deleted!",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Mood Tracker
        </Heading>
        <Text fontSize="md" textAlign="center">
          Track your mood swings in the most dramatic way!
        </Text>

        <Box p={4} borderWidth="1px" borderRadius="lg">
          <VStack spacing={4}>
            <Input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
            <Select placeholder="Select mood" value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="Ecstatic">Ecstatic</option>
              <option value="Happy">Happy</option>
              <option value="Meh">Meh</option>
              <option value="Sad">Sad</option>
              <option value="Devastated">Devastated</option>
            </Select>
            <Textarea placeholder="Describe your mood..." value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddMood}>
              Add Mood
            </Button>
          </VStack>
        </Box>

        <List spacing={3}>
          {moods.map(({ id, date, mood, description }) => (
            <ListItem key={id} p={3} borderWidth="1px" borderRadius="lg" display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Text fontWeight="bold">
                  {mood} <ListIcon as={moodIcons[mood]} color="green.500" />
                </Text>
                <Text fontSize="sm">{description}</Text>
                <Text fontSize="xs">{date}</Text>
              </Box>
              <CloseButton onClick={() => handleDeleteMood(id)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

const moodIcons = {
  Ecstatic: FaRegSmileBeam,
  Happy: FaRegSmileBeam,
  Meh: FaRegMeh,
  Sad: FaRegSadCry,
  Devastated: FaRegAngry,
};

export default Index;
