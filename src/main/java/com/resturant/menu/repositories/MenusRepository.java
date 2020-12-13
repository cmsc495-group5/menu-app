/*
 * file Name: MenusRepository.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Interface for Mongo db interactions for Menus
 */

package com.resturant.menu.repositories;

import com.resturant.menu.models.Menu;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MenusRepository extends CrudRepository<Menu, String> {
    void delete(Menu deleted);

    List<Menu> findByActive(boolean active);
}
