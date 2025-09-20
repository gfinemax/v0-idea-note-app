"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function IdeaCard({ idea, onEdit, onDelete }) {
  const handleDelete = () => {
    if (confirm("정말로 이 아이디어를 삭제하시겠습니까?")) {
      onDelete(idea.id)
    }
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2 text-balance">{idea.title}</CardTitle>
        <div className="text-sm text-muted-foreground">{idea.createdAt}</div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-foreground leading-relaxed flex-1 line-clamp-4 text-pretty">{idea.content}</p>

        <div className="flex gap-2 mt-4 pt-3 border-t border-border">
          <Button variant="outline" size="sm" onClick={() => onEdit(idea)} className="flex-1">
            ✏️ 수정
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            className="flex-1 text-destructive hover:text-destructive-foreground hover:bg-destructive bg-transparent"
          >
            🗑️ 삭제
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
