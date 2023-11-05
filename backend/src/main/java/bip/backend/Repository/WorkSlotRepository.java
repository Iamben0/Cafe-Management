package bip.backend.Repository;

import bip.backend.Entity.WorkSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface WorkSlotRepository extends JpaRepository<WorkSlot, Integer> {

}