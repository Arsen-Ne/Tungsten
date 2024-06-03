package trigonal.tungsten.history.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import trigonal.tungsten.database.entity.Calculation;
import trigonal.tungsten.database.entity.User;
import trigonal.tungsten.history.service.CalculationHistoryService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import trigonal.tungsten.authentication.service.UserService;

@RestController
@RequestMapping("/calculation-history")
public class CalculationHistoryController {

    @Autowired
    private CalculationHistoryService calculationHistoryService;

    @Autowired
    private UserService userService;

    @PostMapping("/get-history")
    public ResponseEntity<?> getCalculationHistory(@RequestBody CalculationHistoryRequest request) {
        User user = userService.getUserByEmail(request.getEmail());
        List<Calculation> calculations = calculationHistoryService.getCalculationHistory(user);

        List<CalculationHistoryDTO> dto = calculations.stream()
                .map(c -> new CalculationHistoryDTO(c.getOperation(), c.getTask(), c.getResult()))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dto);
    }

    @Getter
    @Setter
    private static class CalculationHistoryRequest {
        private String email;
    }

    @Data
    @AllArgsConstructor
    public class CalculationHistoryDTO {
        private String operationName;
        private String task;
        private String solution;
    }
}