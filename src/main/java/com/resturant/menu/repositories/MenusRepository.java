package com.resturant.menu.repositories;

import com.resturant.menu.models.Menu;
import org.springframework.data.repository.CrudRepository;

public interface MenusRepository extends CrudRepository<Menu, String> {
    void delete(Menu deleted);
}
