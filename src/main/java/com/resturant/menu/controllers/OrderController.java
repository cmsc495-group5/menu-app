package com.resturant.menu.controllers;

import com.resturant.menu.models.Order;
import com.resturant.menu.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
public class OrderController {
    OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @RequestMapping(method= RequestMethod.GET, value="/orders")
    public Iterable<Order> item(){
        return orderService.getOrders();
    }

    @RequestMapping(method=RequestMethod.POST, value="/orders")
    public Order save(@RequestBody Order order){
        order.setUpdated(new Date().toString());
        orderService.saveOrder(order);
        return order;
    }

    @RequestMapping(method=RequestMethod.GET, value="/orders/{id}")
    public Optional<Order> show(@PathVariable String id) {
        return orderService.getOrderById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/orders/{id}")
    public Order update(@PathVariable String id, @RequestBody Order order) {
        return orderService.updateOrder(id, order);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/orders/{id}")
    public String delete(@PathVariable String id) {
        orderService.deleteOrder(id);
        return "";
    }
}