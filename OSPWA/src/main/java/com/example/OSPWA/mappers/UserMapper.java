package com.example.OSPWA.mappers;

import com.example.OSPWA.dtos.UserDTO;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users WHERE id = #{id}")
    UserDTO findById(Long id);

    @Select("SELECT * FROM users")
    List<UserDTO> findAll();

    @Insert("INSERT INTO users(username, email) VALUES(#{username}, #{email})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(UserDTO user);

    @Update("UPDATE users SET username = #{username}, email = #{email} WHERE id = #{id}")
    void update(UserDTO user);

    @Delete("DELETE FROM users WHERE id = #{id}")
    void delete(Long id);
}
