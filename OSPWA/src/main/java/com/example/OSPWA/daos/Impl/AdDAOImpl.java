package com.example.OSPWA.daos.Impl;

import com.example.OSPWA.daos.AdminDAO;
import com.example.OSPWA.entities.Users;
import org.springframework.stereotype.Repository;

@Repository(value = "adminDAO")
public class AdDAOImpl implements AdminDAO {
    @Override
    public Users getUserById(Long id) {
        return null;
    }
}