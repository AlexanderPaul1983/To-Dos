package com.example.To_Dos.services;

import com.example.To_Dos.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.To_Dos.repos.TodoRepo;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepo todoRepo;

    @Autowired
    public TodoService(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    public List<Todo> getAllTodos(){
        return todoRepo.findAll();
    }

    public Todo addTodo(Todo todo){
        return todoRepo.save(todo);
    }
    public void deleteTodo(Long id){
        todoRepo.deleteById(id);
    }

}
