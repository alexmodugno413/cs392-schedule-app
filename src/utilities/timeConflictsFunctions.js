function hasTimeOverlap(time1, time2, term1, term2) {
    if (term1 != term2) {
        return false;
    }
    const [day1, range1] = time1.split(' ');
    const [day2, range2] = time2.split(' ');
  
    if (day1 === day2) {
      const [start1, end1] = range1.split('-');
      const [start2, end2] = range2.split('-');
  
      const startTime1 = parseTimeToMinutes(start1);
      const endTime1 = parseTimeToMinutes(end1);
      const startTime2 = parseTimeToMinutes(start2);
      const endTime2 = parseTimeToMinutes(end2);
  
      if (endTime1 > startTime2 && endTime2 > startTime1) {
        return true;
      }
    }
  
    return false;
  }
  
  function parseTimeToMinutes(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  }
  
  export function findOverlapCourses(formattedCourses, selectedCourses) {
    const overlapCourses = formattedCourses.filter(course1 =>
      selectedCourses.some(course2 =>
        hasTimeOverlap(course1.meets, course2.meets, course1.term, course2.term)
      )
    );
  
// Remove courses from overlapCourses that are also in selectedCourses
  const filteredOverlapCourses = overlapCourses.filter(course1 =>
    !selectedCourses.some(course2 => course1.term === course2.term && course1.title === course2.title && course1.number === course2.number && course1.meets === course2.meets)
  );
  
    return filteredOverlapCourses;
  }