package ltu.group06.work.resoucesmanager.repository;

import ltu.group06.work.resoucesmanager.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository


public interface ResourceRepository extends JpaRepository<Resource, Integer> {
    Optional<Resource> findByResourceTypeAndStatusResources(Resource.ResourceType resourceType, Resource.ResourceStatus statusResources);
    @Query("SELECT r FROM Resource r WHERE r.resourceType = :resourceType AND r.statusResources = 'available'")
    Resource findAvailableResourceByType(Resource.ResourceType resourceType);
}