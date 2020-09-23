function Human(config){
    this.name = config.name;
    this.surname = config.lastname;
    this.age = config.age;
}

Human.prototype = Object.assign(Human.prototype,{
getFullName(){
    return this.name + '' + this.lastname;
},
setFullName(name){
    let split = name.split('');
    this.name = split[0];
    this.lastname = split[1];
}
});

function Student(config){
    Human.call(this,config);
    this.points = config.points;
    this.role = config.role;
}

Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;

Student.prototype = Object.assign(Student.prototype,{
    getMaxMark(){
        return (Math.max(this.points));
    },
    getMinMark(){
        return (Math.min(this.points));
    },
    getAverageMark(){
    return this.points.reduce((a, b) => a + b, 0) / this.points.length;
    }
});

let Bred = new Student ({
    name: 'Bred',
    lastname : 'Pitt',
    age : 30,
    points : [8, 9, 10, 7],
    role : 'student'
});
let Leonardo = new Student ({
    name: 'Leonardo',
    lastname : 'Decaprio',
    age : 40,
    points : [10, 10, 6, 4],
    role : 'student'
});
let Dwayne = new Student ({
    name: 'Dwayne',
    lastname : 'Johnson',
    age : 38,
    points : [8, 7, 9, 5],
    role : 'student'
});
let Arnold = new Student ({
    name: 'Arnold',
    lastname : 'Schwarzenegger',
    age : 70,
    points : [10, 10, 9, 8],
    role : 'student'
});
let Chack = new Student ({
    name: 'Chack',
    lastname : 'Norris',
    age : 58,
    points : [8, 7, 6, 8],
    role : 'student'
});


console.log("Chack's average mark", Chack.getAverageMark());

let group = [Bred, Leonardo, Dwayne, Arnold, Chack]
console.log(group);

function Teacher(config){
    Human.call(this,config);
    this.role = config.role;
    this.group = config.group;
}

Teacher.prototype = Object.assign(Human.prototype,{
    getListOfNamesByAverageMark(){
    return this.group.sort((a, b) => {
        if (a.getAverageMark() < b.getAverageMark()) {
            return -1;
        }
        if (a.getAverageMark() > b.getAverageMark()) {
            return 1;
        }
        return 0;
    }).map(s => s.name);
    },
    getListOfNames(){
        return this.group.map(s => s.name);
    },
    getStudentByName(name){
        const student = this.group.find(s => s.name === name);
        return student ? student : 'The teacher ' + this.name + ' does not have the student ' + name;
    },
    removeStudentByName(name){
        this.group = this.group.filter(s => s.name !== name);
        return this.group;
    },
    updateStudentByName(name, data){
        this.group = this.group.map(s => {
        if (s.name === name) {
            s = Object.assign(s, data)
        }
        return s;
        })
        return this.group;
    }
})


let teacher = new Teacher ({
    name : 'Michael',
    lastname : 'Bubble',
    age: 48,
    role : 'teacher',
    group: group
})
console.log(teacher);
console.log('getListOfNamesByAverageMark:', teacher.getListOfNamesByAverageMark());
console.log('getStudentByName Leonardo:', teacher.getStudentByName("Leonardo"));
console.log('removeStudentByName Leonardo:', teacher.removeStudentByName("Leonardo"));
console.log('getStudentByName Leonardo:', teacher.getStudentByName("Leonardo"));