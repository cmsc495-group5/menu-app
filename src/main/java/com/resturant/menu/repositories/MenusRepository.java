package com.resturant.menu.repositories;

import com.resturant.menu.models.Menu;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MenusRepository extends CrudRepository<Menu, String> {
    void delete(Menu deleted);

    List<Menu> findByActive(boolean active);
}
