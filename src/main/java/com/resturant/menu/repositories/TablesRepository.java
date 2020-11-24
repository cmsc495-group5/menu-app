package com.resturant.menu.repositories;

import com.resturant.menu.models.Table;
import org.springframework.data.repository.CrudRepository;

public interface TablesRepository extends CrudRepository<Table, String> {
    void delete(Table deleted);
    
}
