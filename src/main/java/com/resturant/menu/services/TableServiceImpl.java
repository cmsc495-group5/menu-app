package com.resturant.menu.services;

import com.resturant.menu.models.Table;
import com.resturant.menu.repositories.TablesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class TableServiceImpl implements TableService {

    private TablesRepository tablesRepository;

    @Autowired
    public TableServiceImpl(TablesRepository tablesRepository){
        this.tablesRepository = tablesRepository;
    }

    public Iterable<Table> getTables(){
        return tablesRepository.findAll();
    }

    public Table saveTable(Table sec){
        sec.setUpdated(new Date().toString());
        tablesRepository.save(sec);
        return sec;
    }

    public Optional<Table> getTableById(String id) {
        return tablesRepository.findById(id);
    }

    public Table updateTable(String id, Table table) {
        Optional<Table> optSec = tablesRepository.findById(id);
        Table s = optSec.get();
        
        if (table.getLabel() != null) {
            s.setLabel(table.getLabel());
        }

        s.setUpdated(new Date().toString());
        tablesRepository.save(s);
        return s;
    }

    public String deleteTable(String id) {
        Optional<Table> optItem = tablesRepository.findById(id);
        Table sec = optItem.get();
        tablesRepository.delete(sec);
        return "";
    }
}
