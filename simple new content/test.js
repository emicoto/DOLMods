function newMoney(){

    if(!V.money1){
        console.log('define money1')
        V.money1 = V.money
    }

    Object.defineProperty(V, 'money',{
        get:()=>{
            console.log('get money')
            return V.money1
        },
        set:(value)=>{
            console.log('set money', value)
            V.money1 = value;
        }
    })
}

DefineMacroS('newMoney', newMoney)

const oldPass = Time.pass
Time.pass = function(sec){
    const prevDate = new DateTime(V.startDate + V.timeStamp)
    const fragment = oldPass(sec)
    const currentDate = Time.date

    console.log('passed time:',sec)    
    console.log('prevDate:',prevDate)
    console.log('currentDate:', currentDate)

     if(!V.test){
        V.test = 0
     }
     
     const min = currentDate.minute - prevDate.minute,
     hour = currentDate.hour - prevDate.hour,
     day = currentDate.day - prevDate.day,
     month = currentDate.month - prevDate.month,
     year = currentDate.year - prevDate.year,
     weekday = [prevDate.weekDay, currentDate.weekDay];

     console.log('passed min:',min, ', hour:',hour, ', day:', day, ', month:', month, ', year:', year)
     console.log('weekday', weekday)

     V.test ++
     wikifier('hallucinogen', 1)
     new Wikifier(null, '<<append #addMsg>>test<</append>>')

     setTimeout(()=>{
        new Wikifier(null, '<<append #addMsg>>one more test<</append>>')
     }, 100)

   return fragment
}