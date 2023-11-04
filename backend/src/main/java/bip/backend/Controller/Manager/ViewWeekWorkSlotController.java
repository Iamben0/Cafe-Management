package bip.backend.Controller.Manager;

import bip.backend.Entity.WorkSlot;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/manager/view/week-work-slots/")
public class ViewWeekWorkSlotController {
    @GetMapping("/{date}/")
    public ResponseEntity<String> viewWeekWorkSlot(@PathVariable String date) {
        try {
            return ResponseEntity.ok(new WorkSlot().viewWeekWorkSlot(date));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}