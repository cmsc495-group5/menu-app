package com.resturant.menu.services;

import com.resturant.menu.models.Order;
import com.resturant.menu.repositories.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private OrdersRepository ordersRepository;

    @Autowired
    public OrderServiceImpl(OrdersRepository ordersRepository){
        this.ordersRepository = ordersRepository;
    }

    public Iterable<Order> getOrders(){
        return ordersRepository.findAll();
    }

    public Order saveOrder(Order order){
        order.setUpdated(new Date().toString());
        ordersRepository.save(order);
        return order;
    }

    public Optional<Order> getOrderById(String id) {
        return ordersRepository.findById(id);
    }

    public Order updateOrder(String id, Order order) {
        Optional<Order> optSec = ordersRepository.findById(id);
        Order s = optSec.get();
        
        if (order.getStatus() != null) {
            s.setStatus(order.getStatus());
        }
        
        if (order.getItems() != null) {
            s.setItems(order.getItems());
        }
        
        if (order.getTable() != null) {
            s.setTable(order.getTable());
        }

        s.setUpdated(new Date().toString());
        ordersRepository.save(s);
        return s;
    }

    public String deleteOrder(String id) {
        Optional<Order> optItem = ordersRepository.findById(id);
        Order sec = optItem.get();
        ordersRepository.delete(sec);
        return "";
    }
}
