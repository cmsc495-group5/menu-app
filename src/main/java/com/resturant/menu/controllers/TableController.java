package com.resturant.menu.controllers;

import com.resturant.menu.models.Table;
import com.resturant.menu.services.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
public class TableController {
    TableService tableService;

    @Autowired
    public TableController(TableService tableService){
        this.tableService = tableService;
    }

    @RequestMapping(method= RequestMethod.GET, value="/tables")
    public Iterable<Table> table(){
        return tableService.getTables();
    }

    @RequestMapping(method=RequestMethod.POST, value="/tables")
    public Table save(@RequestBody Table table){
        table.setUpdated(new Date().toString());
        tableService.saveTable(table);
        return table;
    }

    @RequestMapping(method=RequestMethod.GET, value="/tables/{id}")
    public Optional<Table> show(@PathVariable String id) {
        return tableService.getTableById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/tables/{id}")
    public Table update(@PathVariable String id, @RequestBody Table table) {
        return tableService.updateTable(id, table);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/tables/{id}")
    public String delete(@PathVariable String id) {
        tableService.deleteTable(id);
        return "";
    }
}