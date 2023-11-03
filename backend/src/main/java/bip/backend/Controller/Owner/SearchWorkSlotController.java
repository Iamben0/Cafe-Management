package bip.backend.Controller.Owner;

import bip.backend.Entity.WorkSlot;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@NoArgsConstructor
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/owner/search/")
public class SearchWorkSlotController {
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