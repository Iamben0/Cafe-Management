package bip.backend.Controller.Owner;

import bip.backend.Entity.WorkSlot;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/owner/suspend")
public class SuspendWorkSlotController {
    @DeleteMapping("/{id}/")
    public ResponseEntity<String> suspendWorkSlot(@PathVariable int id) {
        try {
            new WorkSlot().suspendWorkSlot(id);
            return ResponseEntity.ok("Work Slot Suspended!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}