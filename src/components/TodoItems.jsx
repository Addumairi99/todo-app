import React, {  useState } from "react";
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

  Input,
  Stack,
  Box,
  Flex,
  Spacer,
  List,
  ListItem,
  Checkbox,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";

import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

function TodoItems(props) {
  const [deleteConf, setDeleteConf] = useState(false);
  const [editModal, seEditModal] = useState(false);
  const [editTask, seEditTask] = useState(props.items.task);
  const [editStatus, seEditStatus] = useState(props.items.status);
  const [editDescription, seEditDescription] = useState(
    props.items.description
  );
  const api = "http://localhost:5000/tasks";
  const toast = useToast();

  const changeStatus = () => {
    props.changeStatus(props.items.id);
    // axios.get(api).then((res) => {
    //   console.log(res.data);
    //   props.setItems(res.data);
    // });
  };

  const updateTask = () => {
    axios
      .patch(`${api}/${props.items.id}`, {
        task: editTask,
        status: editStatus,
        description: editDescription,
      })
      .then(() => {
        axios.get(api).then((res) => {
          console.log(res.data);
          props.setItems(res.data);
        });
        seEditModal(false);

        toast({
          title: "Succes",
        //   description: "Succes to edit todo",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <List mt={4} spacing={3}>
      <Flex
        alignItems="center"
        gap="2"
        border={"1px"}
        borderColor={"gray.200"}
        borderRadius={8}
        h="48px"
        direction="row"
        my={"auto"}
      >
        {props.items.status === "Complate" ? (
          <Checkbox
            disabled
            isChecked={true}
            value="test"
            onChange={changeStatus}
            pl={2}
          >
            <ListItem as="s" fontWeight={"bold"} color={"blackAlpha.900"}>
              {props.items.task}
            </ListItem>
          </Checkbox>
        ) : (
          <Checkbox value="test" onChange={changeStatus} pl={2}>
            <ListItem>{props.items.task}</ListItem>
          </Checkbox>
        )}

        <Spacer />
        <Flex gap="5" mr={2}>
          <IconButton
            bg={"white"}
            size={"md"}
            color={"red"}
            aria-label="Search database"
            icon={<MdDelete />}
            onClick={() => setDeleteConf(true)}
          />
          {/* <DeleteDialog open={open} setOpen={setOpen} /> */}
          <AlertDialog isOpen={deleteConf}>
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete {props.items.task}
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button onClick={() => setDeleteConf(false)}>Cancel</Button>
                  <Button
                    onClick={() => {
                      props.deleteTodo(props.items.id);
                      seEditModal(false);
                    }}
                    colorScheme="red"
                    ml={3}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          <IconButton
            bg={"white"}
            size={"md"}
            color={"green"}
            aria-label="Search database"
            icon={<MdEdit />}
            onClick={() => seEditModal(true)}
          />
          {/* <EditDialog editModal={editModal} seEditModal={seEditModal} /> */}
          <Drawer isOpen={editModal} placement="right">
            <DrawerOverlay />
            <DrawerContent>
              {/* <DrawerCloseButton onClick={() => seEditModal(false)} /> */}
              <DrawerHeader>Edit Task {props.items.id}</DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel htmlFor="username">Task</FormLabel>
                    <Input
                      defaultValue={props.items.task}
                      id="username"
                      placeholder="Enter new task"
                      onChange={(e) => {
                        seEditTask(e.target.value);
                        console.log(e.target.value);
                      }}
                    />
                  </Box>

                  <Box>
                    <FormLabel htmlFor="owner">Status</FormLabel>
                    <Select
                      id="status"
                      defaultValue={editStatus}
                      onChange={(e) => {
                        seEditStatus(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      <option value="Incomplate">Incomplate</option>
                      <option value="Complate">Complate</option>
                    </Select>
                  </Box>

                  <Box>
                    <FormLabel htmlFor="desc">Description</FormLabel>
                    <Textarea
                      defaultValue={props.items.description}
                      id="desc"
                      onChange={(e) => seEditDescription(e.target.value)}
                    />
                  </Box>
                </Stack>
              </DrawerBody>

              <DrawerFooter>
                <Button
                  variant="outline"
                  mr={3}
                  onClick={() => seEditModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={updateTask} colorScheme="blue">
                  Save
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>
    </List>
  );
}

export default TodoItems;
