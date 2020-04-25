package com.connection.databaseconnection.evento;

import com.connection.databaseconnection.convidado.Convidado;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.List;

@Builder
@Data
//( @Data )Esta notação permite que eu não precise chamar os gets e sets pois já é chamado internamente por ela
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long codigo;

    @NotEmpty
    private String nome;

    @NotEmpty
    private String _local;

    @NotEmpty
    private String _data;

    @NotEmpty
    private String horario;

    @OneToMany
    private List<Convidado> convidados;


}
