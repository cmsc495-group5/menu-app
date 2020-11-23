package com.resturant.menu.services;

import com.resturant.menu.models.Table;

import java.util.Optional;

public interface TableService {
    Iterable<Table> getTables();
    Table saveTable(Table table);
    Optional<Table> getTableById(String id);
    Table updateTable(String id, Table table);
    String deleteTable(String id);
}
