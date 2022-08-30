import React, { useRef, useState } from "react";
import {
  FormLabel,
  Select,
  Textarea,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Stack,
  Box,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import axios from "axios";

function BtnAddTask({ addTask, addTodo, setAddTodo }) {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Incomplate");
  const [description, setDescription] = useState("");

  console.log(task);
  const url = "http://localhost:5000/tasks";

  const changeStatus = (newStatus) => {
    setStatus(newStatus);
  };

  const addNewTask = () => {
    if (!task) {
      return toast({
        title: "Warning",
        description: "Fill all the form",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    axios
      .post(url, { task: task, status: status, description: description })
      .then(() => {
        setModalOpen(false);
        setAddTodo(task);
        setTask("");
        toast({
          title: "Succes",
          description: "Succes to add todo",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Button
        colorScheme="blue"
        onClick={() => setModalOpen(true)}
        leftIcon={<AddIcon />}
      >
        Add Task
      </Button>
      <Drawer isOpen={modalOpen} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader>Add New Task</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Task</FormLabel>
                <Input
                  value={task}
                  id="username"
                  placeholder="Enter new task"
                  onChange={(e) => setTask(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="owner">Status</FormLabel>
                <Select id="status" onChange={(e) => setStatus(e.target.value)}>
                  <option value="Incomplate">Incomplate</option>
                  <option value="Complate">Complate</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  id="desc"
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={addNewTask} colorScheme="blue">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default BtnAddTask;
