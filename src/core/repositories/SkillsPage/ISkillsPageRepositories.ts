type SkillsProps = {
  title: string
  description: string
  skills: {
    skillTitle: string
    rankPercent: number
  }[]
  lastJobs: {
    yearMonthStart: string
    yearMonthEnd?: string
    jobTitle: string
    jobDescription: string
  }[]
}

export default interface ISkillsPageRepository {
  getSkillsPage(): Promise<SkillsProps>
  createSkillsPage({ ...skillsPage }: SkillsProps): Promise<void>
  updateSkillsPage({ id, ...skillsPage }: { id: string } & Partial<SkillsProps>): Promise<void>
  deleteSkillsPage(id: string): Promise<void>
}
