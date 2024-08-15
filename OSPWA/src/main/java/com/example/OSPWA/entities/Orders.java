package com.example.OSPWA.entities;

import jakarta.mail.Address;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@DynamicUpdate
@Table(name="orders", schema = "public")
public class Orders implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue
    private UUID id;

    @Column(name = "orderDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date orderDate;

    @Column(name = "status")
    private String status;

    @Column(name = "totalAmount")
    private Double totalAmount;

    @ManyToOne
    @Column(name = "customerId")
    private Users customerId;

    @Column(name = "items")
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<Orders> items;

    @Column(name = "shippingAddress")
    @Embedded
    private Address shippingAddress;

    @Column(name = "paymentMethod")
    private String paymentMethod;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Users getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Users customerId) {
        this.customerId = customerId;
    }

    public List<Orders> getItems() {
        return items;
    }

    public void setItems(List<Orders> items) {
        this.items = items;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

}