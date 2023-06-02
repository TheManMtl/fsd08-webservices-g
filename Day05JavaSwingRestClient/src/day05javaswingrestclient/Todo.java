/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package day05javaswingrestclient;

//import java.time.LocalDate;
import java.util.Date;

public class Todo {

    public long id;
    public String task;
    public Date dueDate;
    // public boolean isDone;
    public Status isDone;

    enum Status {
        Pending, Done
    };

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {

        this.dueDate = dueDate;
        
    }

    public Status getIsDone() {
        return isDone;
    }

    public void setIsDone(Status isDone) {
        this.isDone = isDone;
    }

    @Override
    public String toString() {
        return String.format("%d: %s due by %s (%s)", id, task, dueDate.toString(), isDone);
    }
}
