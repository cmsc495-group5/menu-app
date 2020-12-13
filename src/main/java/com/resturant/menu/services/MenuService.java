/*
 * file Name: MenuService.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Service interface for Menus
 */

package com.resturant.menu.services;

import com.resturant.menu.models.Menu;

import java.util.Optional;

public interface MenuService {
    Iterable<Menu> getMenus();

    Menu saveMenu(Menu menu);

    Optional<Menu> getMenuById(String id);

    Menu updateMenu(String id, Menu menu);

    String deleteMenu(String id);

    Menu getActiveMenu();
}
