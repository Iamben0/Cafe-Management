package bip.backend.Controller.Manager;

import bip.backend.Entity.UserAccount;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/manager/view/week-available-staff/")
public class ViewWeekAvailableStaffController {
    @GetMapping("/{date}/")
    public ResponseEntity<String> vewWeekAvailableStaff(@PathVariable String date) {
        try {
            return ResponseEntity.ok(new UserAccount().vewWeekAvailableStaff(date));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}