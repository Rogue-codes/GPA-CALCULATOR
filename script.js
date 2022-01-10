const add = document.getElementById('btn')
const courseCode = document.getElementById('course-title')
const unit = document.getElementById('unit-load')
const grade = document.getElementById('grade')
const tableBody = document.getElementById('tbody')
const tableFooter = document.getElementById('tfoot')
const table = document.getElementById('table')
const calcCGPA = document.getElementById('calc')
const clear = document.getElementById('clear')
const wrapper = document.querySelector('.wrapper')
const comment = document.getElementById('comment')
let cgpaArray = []

// add courses to the table

add.addEventListener('click', ()=>{

    if(!courseCode.value || unit.value <= 0 || grade.selectedIndex === 0){
        alert('fields are empty')
        return
    }else{
        console.log(grade)
        const row = document.createElement('tr')

        const tdCourseCode = document.createElement('td')
        tdCourseCode.innerHTML = courseCode.value

        const tdUnitLoad = document.createElement('td')
        tdUnitLoad.innerHTML = unit.value

        const tdgrade = document.createElement('td')
        tdgrade.innerHTML = grade.options[grade.selectedIndex].text;

        row.appendChild(tdCourseCode)

        row.appendChild(tdUnitLoad)

        row.appendChild(tdgrade)

        tableBody.appendChild(row)
        
        table.classList.remove('hide')

        calcCGPA.classList.remove('hide')

        clear.classList.remove('hide')
        

        cgpaArray.push({'unitload': unit.value, 'gradeScore':grade.options[grade.selectedIndex].value})
        courseCode.value = '' 
        unit.value = '' 
        grade.selectedIndex = 0
        
        console.log(cgpaArray)

    }

})


// calulate CGPA

calcCGPA.addEventListener('click', () => {
    let unitLoad = 0, productOfUnitLoadAndGrade = 0,
    sumOfproductOfUnitLoadAndGrade = 0


    cgpaArray.forEach(result =>{
        unitLoad += parseInt(result.unitload)
        productOfUnitLoadAndGrade = parseInt(result.unitload) * parseInt(result.gradeScore)
        sumOfproductOfUnitLoadAndGrade += productOfUnitLoadAndGrade
    })

    const tr = document.createElement('tr')
    const tdTotalUnitLoad = document.createElement('td')
    tdTotalUnitLoad.innerHTML = `Your total unit Load is ${unitLoad}`

    const tdCGPA = document.createElement('td')
    tdCGPA.setAttribute('colspan', '2')
    tdCGPA.innerHTML = `Your CGPA for the semester is <strong>${(sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2)}</strong> `
    if((sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) < 2.5){
        tdCGPA.classList.add('fail')

    }else if((sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) > 2.5 && (sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) < 3.5){
        tdCGPA.classList.add('average')

    }else if((sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) >= 3.5){
        tdCGPA.classList.add('success')
    }
    

    tr.appendChild(tdTotalUnitLoad)
    tr.appendChild(tdCGPA)

    if(tableFooter.querySelector('tr') !== null){
        tableFooter.querySelector('tr').remove()
    }

    tableFooter.appendChild(tr)

    if((sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) < 2.5){
        comment.innerText = 'You need to buckle up you are in Third class division '
        comment.classList.add('fail')
    }else if((sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) > 2.5 && (sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) < 3.5){
        comment.innerText = "You are in second class lower division a bit more push and you'll be in second class upper division"
        comment.classList.add('average')

    }else if((sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) > 2.5 && (sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) < 4.5){
        comment.innerText = "Woohoo you're in second class upper division"
        comment.classList.add('success')

    }else if((sumOfproductOfUnitLoadAndGrade/unitLoad).toFixed(2) > 4.5){
        comment.innerText = "Odogwu Nwoke you're doing well keep up with this flying tempo you're a first class student"
        comment.classList.add('success')
    }
})


clear.addEventListener('click', ()=>{
    cgpaArray = []
    tableBody.querySelectorAll('*').forEach(child => child.remove())
    
    if(tableFooter.querySelector('tr') !== null){
        tableFooter.querySelector('tr').remove()
    }

    table.classList.add('hide')

    calcCGPA.classList.add('hide')

    clear.classList.add ('hide')

})