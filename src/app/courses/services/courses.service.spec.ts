import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CoursesService } from "./courses.service";
import { COURSES } from "../../../../server/db-data";

describe('CoursesService', () => {
    let coursesService: CoursesService, httpTestingController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule], // mock implementation of HttpClientModule
            providers: [
                CoursesService,

            ]
        })
        coursesService = TestBed.inject(CoursesService);
        httpTestingController= TestBed.inject(HttpTestingController); // to specify the test data
    });

    it('should retrieve all courses', () => {
        coursesService.findAllCourses().subscribe({
            next: courses => {
                expect(courses).toBeTruthy('No courses returned');
                expect(courses.length).toBe(12, 'Incorrect number of courses');
                const course = courses.find(course => course.id === 12);
                expect(course.titles.description).toBe('Angular Testing Course');

            }
        })
        const req = httpTestingController.expectOne('/api/courses');
        expect(req.request.method).toEqual('GET');
        req.flush({payload: Object.values(COURSES)});
    });
    it('should find a course by id', () => {
        coursesService.findCourseById(12).subscribe({
            next: course => {
                expect(course).toBeTruthy('No courses returned');
                expect(course.id).toBe(12, 'Incorrect course id');

            }
        })
        const req = httpTestingController.expectOne('/api/courses/12');
        expect(req.request.method).toEqual('GET');
        req.flush(COURSES[12]);
    });

    afterEach(() => {
        httpTestingController.verify(); // make sure only the url specified in the "httpTestingController.expectOne" is called
    }) //
});