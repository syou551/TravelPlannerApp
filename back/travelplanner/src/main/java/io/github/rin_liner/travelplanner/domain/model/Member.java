package io.github.rin_liner.travelplanner.domain.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @Size(max = 255)
    private String memberId;
    
    private Long routeId;
    
    @Size(max = 255)
    private String userId;
}
