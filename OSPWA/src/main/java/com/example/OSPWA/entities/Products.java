package com.example.OSPWA.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.DynamicUpdate;

import java.io.Serializable;
import java.util.UUID;

@Entity
@DynamicUpdate
@Table(name="products", schema = "public")
public class Products implements Serializable {

    @Id
    @Column(name = "pid")
    @GeneratedValue
    private UUID pid;

    @Column(name = "pname")
    private String pname;

    @Column(name = "pcost")
    private String pcost;

    @Column(name = "pnum")
    private String pnum;

    @Column(name = "pdescrip")
    private String pdescrip;

    public UUID getPid() {
        return pid;
    }

    public void setPid(UUID pid) {
        this.pid = pid;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getPcost() {
        return pcost;
    }

    public void setPcost(String pcost) {
        this.pcost = pcost;
    }

    public String getPnum() {
        return pnum;
    }

    public void setPnum(String pnum) {
        this.pnum = pnum;
    }

    public String getPdescrip() {
        return pdescrip;
    }

    public void setPdescrip(String pdescrip) {
        this.pdescrip = pdescrip;
    }
}