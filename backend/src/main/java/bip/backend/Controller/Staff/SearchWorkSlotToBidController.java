package bip.backend.Controller.Staff;

import bip.backend.Entity.WorkSlot;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/staff/view/available-work-slots/search/")
public class SearchWorkSlotToBidController {
    // Search by name
    @GetMapping("/{shift}/")
    public ResponseEntity<String> submitSearchCriteria(@PathVariable String shift)
    {
        try {
            return ResponseEntity.ok(new WorkSlot().retrieveWorkSlot(shift));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}