import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-freewrite',
  templateUrl: './freewrite.component.html',
  styleUrls: ['./freewrite.component.css']
})
export class FreewriteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  entries = [
    "I'm just overwhelmed right now with everything. I have an intervview with Vericast and one with DaVita next week so I'm just focused on those. I hope I get an offer so I can start working and having money. Not working and not having money is the worst thing imaginable for mental health. BEcause you become a burden to family members. I'd have to live with my brother and he'd probably get tired of me. Anyways, I think I'm talented and hard working enough where I don't need to be unemployed. I just have emotional issues because life is hard and I've had a hard life. Nonetheless, I should be strong and not whine about life being hard. I should just try harder to feel better. I have friends. I have skills. I can get a job. Some people don't even have family or friends. Some people don't have laptops of the ability to solve difficult math problems or logic problems. Since I'm good at critical thinking and problem solving I can at least work in software engineering and make good money. I don't know what I'm so scared about. I think I'm just impatient. The whole process is a lot of waiting around. I like things to happen quickly if possible, or instantly. Like applying, interviewing and getting an offer all in one day should be the future of work. Like why not. Just make everything move faster. Make background checks automated and faster. Make reference collecting faster. Skills assessments short and to the point. Build a portal where applicants can upload videos instead of the long drawn out process of interviewing them 2 or 3 times. Make hiring automated. WTF. Create an input field for salary expectations. Create a bot to negotiate salaries. Make it fair. Make salaries explicit and clear. Make job requirements clear. Like if you pass this code exam in 60 minutes and score 80% you'll move onto the next round. Take human bias out of it. WTF"
  ]

}
