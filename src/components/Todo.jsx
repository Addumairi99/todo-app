import React, { useEffect, useState } from "react";
import { useToast,  Container, Flex, Spacer } from "@chakra-ui/react";

import TodoItems from "./TodoItems";
import Header from "./Header";
import BtnFilter from "./BtnFilter";
import BtnAddTask from "./BtnAddTask";
import axios from "axios";
// const port = process.env.REACT_APP_PORT;

const api = "https://fake-api-to.herokuapp.com/tasks";

function Todo() {
  const [items, setItems] = useState([]);
  const [addTodo, setAddTodo] = useState("");
  const toast = useToast();
  // console.log(port)
  // console.log(devEnv)

  useEffect(() => {
    axios.get(api).then((res) => {
      console.log(res.data)
      setItems(res.data);
    });
  }, [addTodo]);
  console.log(items);

  const changeStatus = (id) => {
    axios.patch(`${api}/${id}`, { status: "Complate" }).then(() => {
      axios.get(api).then((res) => {
        console.log(res.data);
        setItems(res.data);
      });
    });
  };



  const deleteTodo = (id) => {
    axios.delete(`${api}/${id}`).then(() => {
      toast({
        title: "Delete Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      axios.get(api).then((res) => {
        console.log(res.data);
        setItems(res.data);
      });
    });
  };

  // console.log(items);

  const renderTodoItems = () => {
    return items.map((val) => {
      return (
        <TodoItems
          key={val.id}
          items={val}
          setItems ={setItems}
          deleteTodo={deleteTodo}
          changeStatus={changeStatus}
        />
      );
    });
  };

  return (
    <Container>
      <Header />
      <Flex>
        <BtnAddTask addTodo={addTodo} setAddTodo={setAddTodo} />
        <Spacer />
        <BtnFilter />
      </Flex>
      {renderTodoItems()}
    </Container>
  );
}

export default Todo;
