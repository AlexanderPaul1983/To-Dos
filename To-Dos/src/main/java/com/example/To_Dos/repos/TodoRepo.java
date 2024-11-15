package com.example.To_Dos.repos;

import com.example.To_Dos.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepo extends JpaRepository<Todo, Long> {

}
