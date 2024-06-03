package trigonal.tungsten.history.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import trigonal.tungsten.authentication.service.UserService;
import trigonal.tungsten.database.entity.Calculation;
import trigonal.tungsten.database.entity.User;
import trigonal.tungsten.database.repository.CalculationRepository;

@Service
public class CalculationHistoryService {

    @Autowired
    private CalculationRepository repository;

    @Autowired
    private UserService userService;

    public void saveCalculationToHistory(String operation, String task, String result, String email) {
        if (email == null) {
            return;
        }

        User user = userService.getUserByEmail(email);

        Calculation calculation = new Calculation();
        calculation.setUser(user);
        calculation.setOperation(operation);
        calculation.setTask(task);
        calculation.setResult(result);
        repository.save(calculation);
    }

    public List<Calculation> getCalculationHistory(User user) {
        return repository.findLast10ByUser(user);
    }
}