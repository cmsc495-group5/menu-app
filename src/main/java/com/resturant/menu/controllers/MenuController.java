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
    public MenuController(MenuService menuService){
        this.menuService = menuService;
    }

    @RequestMapping(method= RequestMethod.GET, value="api/test")
    public String test() {
        return "test";
    }

    @RequestMapping(method= RequestMethod.GET, value="/menus")
    public Iterable<Menu> menu(){
        return menuService.getMenus();
    }

    @RequestMapping(method=RequestMethod.POST, value="/menus")
    public Menu save(@RequestBody Menu menu){
        menu.setUpdated(new Date().toString());
        menuService.saveMenu(menu);
        return menu;
    }

    @RequestMapping(method=RequestMethod.GET, value="/menus/{id}")
    public Optional<Menu> show(@PathVariable String id) {
        return menuService.getMenuById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/menus/{id}")
    public Menu update(@PathVariable String id, @RequestBody Menu menu) {
        return menuService.updateMenu(id, menu);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/menus/{id}")
    public String delete(@PathVariable String id) {
        menuService.deleteMenu(id);
        return "";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/menus/{id}/activate")
    public String activateMenu(@PathVariable String id){
        menuService.activateMenu(id);
        return "";
    }

    @RequestMapping(method=RequestMethod.GET, value="/menus/active")
    public Menu show(){
        return menuService.getActiveMenu();
    }
}