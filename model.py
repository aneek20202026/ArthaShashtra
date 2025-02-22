from settings import *

class User(db.Model):
    __tablename__ = 'user'
    
    uid = db.Column(db.String, primary_key=True, nullable=False)
    industry = db.Column(db.String, nullable=True)
    annual_revenue = db.Column(db.ARRAY(db.Float), nullable=True)
    recurring_expenses = db.Column(db.ARRAY(db.Float), nullable=True)
    monthly_budget = db.Column(db.ARRAY(db.Float), nullable=True)
    savings = db.Column(db.ARRAY(db.Float), nullable=True)
    timestamp = db.Column(db.ARRAY(db.TIMESTAMP(timezone=True)), nullable=True)

    def __init__(self, uid, industry=None, annual_revenue=None, recurring_expenses=None, 
                 monthly_budget=None, savings=None, timestamp=None):
        self.uid = uid
        self.industry = industry
        self.annual_revenue = annual_revenue
        self.recurring_expenses = recurring_expenses
        self.monthly_budget = monthly_budget
        self.savings = savings
        self.timestamp = timestamp

    def get_columns():
        return {
            "industry":"",
            "annual_revenue":"",
            "recurring_expenses":"",
            "monthly_budget":"",
            "savings":"",
        }
