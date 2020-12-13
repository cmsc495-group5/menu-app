package com.resturant.menu.services;

import com.resturant.menu.models.OrderItem;
import com.resturant.menu.repositories.OrderItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemsRepository orderItemsRepository;

    @Autowired
    public OrderItemServiceImpl(OrderItemsRepository orderItemsRepository) {
        this.orderItemsRepository = orderItemsRepository;
    }

    public Iterable<OrderItem> getOrders() {
        return orderItemsRepository.findAll();
    }

    public OrderItem saveOrder(OrderItem order) {
        order.setUpdated(new Date().toString());
        orderItemsRepository.save(order);
        return order;
    }

    public Optional<OrderItem> getOrderById(String id) {
        return orderItemsRepository.findById(id);
    }

    public OrderItem updateOrder(String id, OrderItem order) {
        Optional<OrderItem> optSec = orderItemsRepository.findById(id);
        OrderItem s = optSec.get();

        if (order.getTotal() != null) {
            s.setTotal(order.getTotal());
        }

        if (order.getPrepNotes() != null) {
            s.setPrepNotes(order.getPrepNotes());
        }

        if (order.getCount() != null) {
            s.setCount(order.getCount());
        }

        if (order.getItemName() != null) {
            s.setItemName(order.getItemName());
        }

        if (order.getPrice() != null) {
            s.setPrice(order.getPrice());
        }
        if (order.getOptions() != null) {
            s.setOptions(order.getOptions());
        }

        s.setUpdated(new Date().toString());
        orderItemsRepository.save(s);
        return s;
    }

    public String deleteOrder(String id) {
        Optional<OrderItem> optItem = orderItemsRepository.findById(id);
        OrderItem sec = optItem.get();
        orderItemsRepository.delete(sec);
        return "";
    }
}
