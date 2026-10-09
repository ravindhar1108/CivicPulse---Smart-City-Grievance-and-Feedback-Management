package Project.Civic.Pulse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/")
    String greet()
    {
        return "Hello world";
    }
}
