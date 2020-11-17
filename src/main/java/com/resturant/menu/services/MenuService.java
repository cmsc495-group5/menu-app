package com.resturant.menu.services;

import com.resturant.menu.models.Menu;

import java.util.Optional;

public interface MenuService {
    Iterable<Menu> getMenus();
    Menu saveMenu(Menu menu);
    Optional<Menu> getMenuById(String id);
    Menu updateMenu(String id, Menu menu);
    String deleteMenu( String id);
    void activateMenu(String id);
}
