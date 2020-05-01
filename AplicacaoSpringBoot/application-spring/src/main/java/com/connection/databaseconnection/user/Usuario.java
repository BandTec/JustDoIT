package com.connection.databaseconnection.user;

import com.connection.databaseconnection.conhecimento.Conhecimento;
import com.connection.databaseconnection.posts.Posts;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table( name = "usuario", schema = "teste3")
public class Usuario {

    @Id
    @Column( name = "id" )
    @GeneratedValue( strategy = GenerationType.AUTO)
    private Long id;
    @Column( name = "nome")
    private String nome;
    @Column( name = "email")
    private String email;
    @Column( name = "photo")
    private String photo;
    @Column( name = "senha")
    private String senha;
    @Column( name = "sobre")
    private String sobre;
//    @OneToMany( mappedBy = "usuario")
//    private List<Conhecimento> conhecimentos;

}
