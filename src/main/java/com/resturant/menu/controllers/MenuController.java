/*
 * file Name: MenuController.java
 * date: 12/13/2020
 * author: Group 5
 * purpose: Controller for Menu related functions
 */

package com.resturant.menu.controllers;

import com.resturant.menu.models.Menu;
import com.resturant.menu.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
public class MenuController {
    MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/menus")
    public Iterable<Menu> getMenus() {
        return menuService.getMenus();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/menus")
    public Menu saveMenu(@RequestBody Menu menu) {
        menu.setUpdated(new Date().toString());
        menuService.saveMenu(menu);
        return menu;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/menus/{id}")
    public Optional<Menu> getMenu(@PathVariable String id) {
        return menuService.getMenuById(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/menus/{id}")
    public Menu updateMenu(@PathVariable String id, @RequestBody Menu menu) {
        return menuService.updateMenu(id, menu);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/menus/{id}")
    public String deleteMenu(@PathVariable String id) {
        menuService.deleteMenu(id);
        return "";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/menus/active")
    public Menu getActiveMenu() {
        return menuService.getActiveMenu();
    }
}
