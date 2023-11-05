package bip.backend.Controller.Manager;

import bip.backend.Entity.UserAccount;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/manager/view/day-available-staff/")
public class ViewDayAvailableStaffController {
    @GetMapping("/{date}/")
    public ResponseEntity<String> vewDayAvailableStaff(@PathVariable String date) {
        try {
            return ResponseEntity.ok(new UserAccount().vewDayAvailableStaff(date));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}