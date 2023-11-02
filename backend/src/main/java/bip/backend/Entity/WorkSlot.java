package bip.backend.Entity;

import bip.backend.GetRepository;
import bip.backend.Repository.BidRepository;
import bip.backend.Repository.WorkSlotRepository;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "work_slot")
@JsonIgnoreProperties({"bid"})
public class WorkSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "shift", nullable = false)
    private String shift;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @OneToMany(mappedBy = "workSlot")
    private Set<Bid> bids = new LinkedHashSet<>();

//    @Column(name = "active", nullable = false)
//    private Boolean active = true;


    public String viewWorkSlot() {
        List<WorkSlot> workSlotList = GetRepository.WorkSlot().findAll();
        ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

        ArrayNode arrayNode = mapper.createArrayNode();
        for (WorkSlot workSlot : workSlotList) {
            if (workSlot.date.isBefore(LocalDate.now())) {
                continue;
            }
            String staff = "Not assigned";
            for (Bid bid : workSlot.getBids()) {
                if (bid.getApproved()) {
                    staff = bid.getStaff().getName();
                }
            }
            ObjectNode on = mapper.createObjectNode();
            on.put("staff", staff);
            on.put("shift", workSlot.getShift());
            on.put("role", workSlot.getRole());
            on.put("date", workSlot.getDate().toString());
            on.put("id", workSlot.getId());
            arrayNode.add(on);
        }
        return arrayNode.toString();
    }

    public void deleteWorkSlot(int id) {
        WorkSlotRepository workSlotRepository = GetRepository.WorkSlot();
        BidRepository bidRepository = GetRepository.Bid();
        WorkSlot workSlot = workSlotRepository.findById(id).orElse(null);

        assert workSlot != null;
        Bid bid = bidRepository.findByWorkSlotId(workSlot.getId());
        bidRepository.delete(bid);
        workSlotRepository.delete(workSlot);
    }

    public String retrieveWorkSlot(String shift) throws JsonProcessingException {
        String list = viewWorkSlot();
        ArrayNode arrayNode = new ObjectMapper().createArrayNode();
        arrayNode.addAll((ArrayNode) new ObjectMapper().readTree(list));

        if (shift.isBlank()) {
            return arrayNode.toString();
        } else {
            ArrayNode filteredArrayNode = new ObjectMapper().createArrayNode();
            for (JsonNode jsonNode : arrayNode) {
                if (jsonNode.get("shift").asText().toLowerCase().contains(shift.toLowerCase())) {
                    filteredArrayNode.add(jsonNode);
                }
            }
            return filteredArrayNode.toString();
        }
    }

    public void updateWorkSlot(String id, String newShift, String newRole, String newDate) {
        WorkSlotRepository workSlotRepository = GetRepository.WorkSlot();
        WorkSlot workSlot = workSlotRepository.findById(Integer.parseInt(id)).orElseThrow(() -> new RuntimeException("Work Slot not found"));
        if (newShift.equals(workSlot.getShift()) &&
                newRole.equals(workSlot.getRole()) &&
                newDate.equals(workSlot.getDate().toString())) {
            throw new RuntimeException("No changes detected");
        }
        workSlot.setShift(newShift);
        workSlot.setRole(newRole);
        workSlot.setDate(LocalDate.parse(newDate));
        workSlotRepository.save(workSlot);
    }

    public void createWorkSlot(String shift, String role, String date) {
        WorkSlotRepository workSlotRepository = GetRepository.WorkSlot();
        BidRepository bidRepository = GetRepository.Bid();

        if (shift.isEmpty() || role.isEmpty() || date.isEmpty()) {
            throw new RuntimeException("Please fill in all fields");
        }
        WorkSlot workSlot = new WorkSlot();
        workSlot.setShift(shift);
        workSlot.setRole(role);
        workSlot.setDate(LocalDate.parse(date));

        workSlotRepository.save(workSlot);

        Bid bid = new Bid();
        bid.setApproved(false);
        bid.setStaff(null);
        bid.setWorkSlot(workSlot);
        bidRepository.save(bid);
    }

    public String viewWorkSlotToBid() {
        List<WorkSlot> workSlotList = GetRepository.WorkSlot().findAll();
        ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

        ArrayNode arrayNode = mapper.createArrayNode();
        for (WorkSlot workSlot : workSlotList) {
            if (workSlot.date.isBefore(LocalDate.now())) {
                continue;
            }
            String staff = "Not assigned";
            for (Bid bid : workSlot.getBids()) {
                if (bid.getApproved()) {
                    staff = bid.getStaff().getName();
                }
            }

            ObjectNode obj1 = mapper.createObjectNode();
            obj1.put("staff", staff);
            obj1.put("shift", workSlot.getShift());
            obj1.put("role", workSlot.getRole());
            obj1.put("date", workSlot.getDate().toString());
            obj1.put("id", workSlot.getId());
            arrayNode.add(obj1);
        }
        return arrayNode.toString();
    }

}
