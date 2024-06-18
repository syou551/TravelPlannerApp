package io.github.rin_liner.travelplanner.domain.dto;

import java.util.List;

import io.github.rin_liner.travelplanner.domain.model.Route;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private String userId;
    private String userName;
    private String addr;
    private String timesId;
    private List<Route> routes;
}
