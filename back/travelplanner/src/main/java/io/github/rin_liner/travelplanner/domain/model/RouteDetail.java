package io.github.rin_liner.travelplanner.domain.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
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
public class RouteDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int routeDetailId;
    
    @NotNull
    private Long routeId;
    
    @NotNull
    @Size(max = 255)
    private String placeId;
    
    @Size(max = 255)
    private String placeName;
    
    private int routeRank;
}
