package bip.backend.Controller.Manager;

import bip.backend.Entity.WorkSlot;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/manager/view/day-work-slots/")
public class ViewDayWorkSlotController {
    @GetMapping("/{date}/")
    public ResponseEntity<String> viewDayWorkSlot(@PathVariable String date) {
        try {
            return ResponseEntity.ok(new WorkSlot().viewDayWorkSlot(date));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}